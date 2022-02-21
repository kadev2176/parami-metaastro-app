import type { BigNumber, ContractTransaction } from "ethers";

export async function extractEventArgs<T, R>(tx: ContractTransaction, extractor: (event: T) => R): Promise<R | undefined> {
    const events = (await tx.wait()).events;

    if (!events || !events[0].args) {
        return undefined;
    }

    return extractor(events[0] as unknown as T);
}

export async function extractTokenIdFromEvent(tx: ContractTransaction): Promise<BigNumber> {
    const tokenId = await extractEventArgs(tx, (event: any) => { return event.args.tokenId; });
    if (!tokenId) {
        throw new Error();
    }
    return tokenId;
}