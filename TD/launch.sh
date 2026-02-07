# pnpm install .

cd td1
pnpm install .
clear && NODE_OPTIONS='--max-old-space-size=200' pnpm run --filter td1 start

cd td1refactor
pnpm install .
clear && NODE_OPTIONS='--max-old-space-size=200' pnpm run --filter td1refactor start