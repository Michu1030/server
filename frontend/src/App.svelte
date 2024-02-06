<script lang="ts">
  let response: String;

  async function sendRequest() {
    const res = await fetch("/api", {
      method: "GET",
    });

    return res.text();
  }

  async function getHome() {
    response = await sendRequest();
  }
</script>

<main>
  {response}

  <button on:click={getHome}>Send request</button>
</main>
