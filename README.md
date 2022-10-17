# PaperCraft

This is a easy-to-use, minimalized 2D game with extensive crafting capabilities.

The latest update at `dev` branch.

# How to run

## Node version: 16.13.0

`build` to build under production mode.
`start` to directly serve at local port.

i.e, `npm run start` or `yarn start` after packages installed.

Refer to `package.json` and `yarn.lock` if any pacakge version conflicts happen. Remove `yarn.lock` file if you are not using `yarn`.

# Develop

- We are currently using `master` as the default branch.
- `dev` branch has the most recent changes.
- Branch naming: `[branch from]-[feature]`, e.g., `dev-dnd` is branched from `dev` for `drag-n-drop` features. This rule can be chained.

# TODO

1. Add another layer of shape creation APIs which will create corresponding polygons.
2. ✅ Add weapon/defense slot properties to static shape: another class of shapes inherented from the basic shapes. The MobileShape class will inherent this class.
3. Add boudaries to the creation sesssion
4. ✅ Fix the viewport, limit the movement with boundaries
5. ✅ Procedural generation of enemies - need to fix some obstacles textures to make it looks better
6. ☑️ The ui of vessel creation

# Bucket

1. Arrows for weapons
2. Arrow damage depends on color
3. Drag and drop should be handeled by pixi
4.

# References

[Pixi boilerplate](https://github.com/dopamine-lab/pixi-boilerplate).
