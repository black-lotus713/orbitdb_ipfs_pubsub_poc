# orbitdb_ipfs_pubsub_poc_database
Proof of concept app for creating a central orbitdb instance to publish and ipfs pubsub feed that client apps can call to get new hashes to pin. A server side autopinner would be pushing hashes to this db as it grabs/pins content.

With NodeJS installed, make a directory and run:
npm init

if you don't have express installed run:
npm i express

next, run the following to install orbitdb and your ipfs node:
npm install orbit-db ipfs

once these commands are completed, make sure this repo is loaded into your app folder and run:
node index_orbitdb.js

example calls are in the "curl examples.txt" file
you can use those in your requestor of choice or check out my other repo to see the POC client side app I built to accompany this.
