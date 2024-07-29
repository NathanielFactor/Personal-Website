<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer class="foot">
		<h1>Socials</h1>
		<ul class="social-icons">
			<li><a href="https://www.linkedin.com/in/nathaniel-factor/" target="_blank" rel="noopener noreferrer"><img src="/linkedin_svg.png" alt="LinkedIn" /></a></li>
			<li><a href="https://www.youtube.com/channel/UCQkoSLhoyLxVu-SqehwfdUA" target="_blank" rel="noopener noreferrer"><img src="/Youtube_logo.png" alt="Youtube" /></a></li>
			<li><a href="https://github.com/NathanielFactor" target="_blank" rel="noopener noreferrer"><img src="/github.svg" alt="GitHub" /></a></li>
		</ul>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}
	.social-icons {
		list-style: none;
		display: flex;
		gap: 10rem;
	}
	.social-icons a img {
		display: flex;
		max-width: 48px;
		max-height: 48px;
		width: 48px;
		height: 48px;
		object-fit: contain;
	}

	.foot {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		color: rgb(48, 44, 44);
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
