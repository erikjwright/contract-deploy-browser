<script lang="ts">
	import { ethers } from "ethers";

	import "../app.css";

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

<header class="px-8 py-4 shadow-lg"><h1 class="text-3xl font-bold">Contract Browser Deployment</h1></header>
<main class="container mx-auto py-12">
	<button on:click={deploy} class="btn btn-primary">Deploy</button>
</main>
