# Plac3
Plac3 is a r/place clone **fully** on chain **(every pixels and colors is store on chain)** implemented on the "MUD" framework.
I want this plac3 to be a canvas for representing each of the DApp communities. You can draw anything on this plac3. It can be anything you like (your cat, your meme, an ads for your nft project, etc). You can draw it alone or even recruit people from your community to help you drawing what represent your community.


**DEMO** 
>To try plac3 you can go to [plac3.xyz](https://plac3.xyz) I recommned you use metamask and set it to ethereum mainnet! since our contract is not support eth mainnet so it will redirect you to lattice chain which have indexer for loading (**take less than 10 sec refresh page if not**) you can get eth on lattice chain by `npx @latticexyz/cli faucet --address <deployer_address>` but lattice chain is not support the graph you will not be able to try inspect and searching! To try those feature I recommend you go to **gnosis mainnet** chain since it give the quicket loading among optimism goerli and polygon mumbai.

**[MUD](https://mud.dev/)**
Plac3 building on top of @latticexyz/mud. It is a framework for managing complex smart contracts. It adds some conventions for organizing data and logic and abstracts away low-level complexities so I can focus on the features of Plac3.

**Canvas Size**
Plac3 canvas is 320 x 160 pixels. Since deploying a large canvas in a smart contract is time-consuming or may even fail, Plac3 is composed of 8 sub-canvases of 80x80 each. I think the size can be expand more but due to limited of time (even this take like 20-30 mins for deploy) I'm end up with this size.

**The Graph**
The inspect feature is possible because of the graph. To know which address is painted on pixel coordinates (x,y). At first, I tried storing it on a chain. The result turned out to be overkill for the smart contract size, which led to failure when deployed, so I changed it to be an event trigger each time the user is drawing on canvas instead. With the power of the graph, I can query that information from the subgraph using graphql.

**Rendering**
For a better user experience, I've rendered the canvas from "CanvasRenderingContext2D.putImageData", which is the same as its origin (r/place). I've tried Tailwind to render the canvas first since it's easier to use, but it seems to have lower performance compared to this 'CanvasRenderingContext2D' method.
