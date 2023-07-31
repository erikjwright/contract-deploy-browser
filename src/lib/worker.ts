importScripts("https://binaries.soliditylang.org/bin/soljson-v0.8.21+commit.d9974bed.js?url");

interface SolidityWorker extends Worker {
	Module: any;
}

(() => {
	const worker: SolidityWorker = self as any;

	worker.onmessage = async ({ data }) => {
		// const list = await (await fetch("https://binaries.soliditylang.org/bin/list.json")).json();
		// const release = list.releases[list.latestRelease];
		// console.log(release);

		const soljson = worker.Module;

		if ("_solidity_compile" in soljson) {
			const compile = soljson.cwrap("solidity_compile", "string", ["string", "number"]);
			const output = JSON.parse(compile(JSON.stringify(data.input)));

			postMessage({
				abi: output.contracts.contract[data.contractName].abi,
				bytecode: output.contracts.contract[data.contractName].evm.bytecode.object
			});
		}
	};
})();
