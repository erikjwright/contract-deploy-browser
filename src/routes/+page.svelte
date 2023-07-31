<script lang="ts">
	import { ethers } from "ethers";

	async function deploy() {
		const { compile } = await import("$lib/compile");

		const contractName = "MyToken";

		const { abi, bytecode } = await compile({
			contractName,
			contractCode: `contract ${contractName} { function f() public { } }`
		});

		console.log("Abi: " + abi);
		console.log("Bytecode: " + bytecode);

		const provider = new ethers.BrowserProvider(window.ethereum);

		const runner = new ethers.ContractFactory(abi, bytecode, await provider.getSigner());

		await runner.deploy();
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button on:click={deploy}>Deploy</button>
