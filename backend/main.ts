import { Application, Router } from "https://deno.land/x/oak@v12.6.2/mod.ts"
import { Status } from "https://deno.land/x/oak_commons@0.4.0/status.ts";

const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Hi mom!"
})

router.get("/add/:a/:b", (ctx) => {
  const { a, b } = ctx.params
  const value = Number(a) + Number(b)
  ctx.response.body = value
})

const dict: Record<string, string> = {}

router.post("/dict/set/:key/:value", (ctx) => {
  const { key, value } = ctx.params
  dict[key] = value
  ctx.response.status = Status.NoContent
})

router.get("/dict/get/:key", (ctx) => {
  const { key } = ctx.params
  ctx.response.body = dict[key]
})

const kv = await Deno.openKv()
router.post("/register", async (ctx) => {
  try {
      const body = ctx.request.body({ type: "json" })
      const credentials = await body.value
      
      if (!credentials.login || !credentials.password) {
        ctx.response.status = Status.BadRequest
        return;
      }
      
      const key = ["users", credentials.login]
      const entry = await kv.get(key);
      
      if (entry.versionstamp) {
        ctx.response.status = Status.Unauthorized
        return;
      }

      const value = { password: credentials.password }
      await kv.set(key, value)
      ctx.response.status = Status.NoContent
  } catch {
      ctx.response.status = Status.Unauthorized
  }
}).post("/login", async (ctx) => {
  try {
    const body = ctx.request.body({ type: "json" })
    const credentials = await body.value

    if (!credentials.login || !credentials.password) {
      ctx.response.status = Status.BadRequest
      return;
    }

    const key = ["users", credentials.login]
    const entry = await kv.get<{ password: string }>(key);

    if (entry.value?.password === credentials.password) {
      // tymczasowo
      ctx.response.status = Status.NoContent
    } else {
      ctx.response.status = Status.Unauthorized
    }
  } catch {
    ctx.response.status = Status.Unauthorized
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 });