interface CompileOptions {
	contractCode: string;
	contractName: string;
}

const worker = new Worker(new URL("./worker.ts", import.meta.url));

export async function compile({
	contractCode,
	contractName
}: CompileOptions): Promise<{ abi: string[]; bytecode: string }> {
	const input = {
		language: "Solidity",
		sources: {
			contract: {
				content: contractCode
			}
		},
		settings: {
			outputSelection: {
				"*": {
					"*": ["*"]
				}
			}
		}
	};

	return new Promise((resolve, reject) => {
		worker.postMessage({ input, contractName });
		worker.onmessage = ({ data }) => {
			resolve(data);
		};
		worker.onerror = () => {
			reject(new Error("Failed to compile contract"));
		};
	});
}
