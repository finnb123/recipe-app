<script lang="ts">
  import "../app.pcss";
  import type { LayoutServerData } from "./$types";
  export let data: LayoutServerData;

  let showMenu = false;
  let toggleNavbar = () => {
    showMenu = !showMenu;
  };

  interface Route {
    name: string;
    route: string;
  }
  const routes: Route[] = [
    { name: "Profile", route: "/profile" },
    { name: "Drafts", route: "/drafts" },
    { name: "Sign Out", route: "/auth/signout" },
  ];
  const signin: Route = { name: "Sign In", route: "/auth/signin" };

  // don't create a separate signIn object, you can either
  // use a ternary operator or a conditional block here
  // you can also use .filter() in the template with an
  // isAuthenticated key in the object
</script>

<!-- Instead of doing this, probably it's better to use svelte-meta-tags -->
<svelte:head>
  <meta charset="utf-8" />
  <link
    rel="icon"
    type="image/x-icon"
    href="https://cdn-icons-png.flaticon.com/512/5403/5403020.png"
  />
  <title>✨Recipes✨</title>
</svelte:head>

<!-- dont use <body>, it's already included in app.html -->
<body class="h-screen bg-secondary">
  <div>
    <div class="fixed top-0 left-0 right-0 bg-background">
      <nav class="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center">
        <div class="flex items-center justify-between">
          <a class=" font-bold text-headline md:text-2xl hover:text-highlight" href="/">
            <span
              class="font-poppins self-center text-3xl font-semibold whitespace-nowrap dark:text-white"
              >Recipes.com</span
            >
          </a>

          <div class="flex md:hidden">
            <button
              type="button"
              on:click={toggleNavbar}
              class="text-headline hover:text-secondary focus:outline-none focus:text-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0 {showMenu
            ? 'flex'
            : 'hidden'}"
        >
          <!-- 
          when using complex pageloaddata values,
          destructure with a reactive binding in the
          top level script. that way you make
          it clearer how you're using that data and much easier to follow
         -->
          {#if data.logged_in}
            {#each routes as route}
              <a class="text-xl text-secondary hover:text-highlight" href={route.route}>
                {route.name}
              </a>
            {/each}
          {:else}
            <a class="text-xl text-secondary hover:text-highlight" href={signin.route}>
              {signin.name}
            </a>
          {/if}

          <form class="flex items-center space-x-2 border-2 border-highlight rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-highlight"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <input
              class="w-full outline-none bg-background placeholder-secondary text-headline placeholder-xl text-xl"
              type="text"
              placeholder="Search"
            />
          </form>
        </div>
      </nav>
    </div>
    <div class="h-36 bg-secondary"></div>
  </div>

  <slot />
</body>
