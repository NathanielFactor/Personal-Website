<svelte:head>
  <title>Nathaniel Factor</title>
  <meta name="Home" content="Home" />
</svelte:head>

<div class="landingpage text-center">
  <h1 class="text-4xl font-bold mb-4">Nathaniel Factor</h1>
  <img src="/background_cmd.jpg" alt="homepicture" class="border-4 rounded-lg shadow-lg p-2 mx-auto">
</div>

<script>
  export let data;
</script>

<div class="mt-8">
  <p class="text-lg">Supabase test</p>
  <ul class="list-disc list-inside mt-4">
    {#each data.countries as country}
      <li>{country.name}</li>
    {/each}
  </ul>
</div>

<style>
  .landingpage {
    display: inline-block;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: rgb(48, 44, 44);
    align-content: center;
    text-align: center;
  }
</style>
