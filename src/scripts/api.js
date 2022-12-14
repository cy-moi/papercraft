import craftShop from './craftShop';

export async function addCraft(config) {
  const { id, model, host } = config; // Be only used to add crafts.
  const craftModel = craftShop.find((it) => it.name === model);
  const craft = new craftModel.constructor(id);
  host.addChild(craft);
  console.log('config', config);
  await craft.init(config);
  host.craftAll.push(craft);
  return craft;
}

export function removeCraft(host, id) {
  const craft = host.craftAll.find((it) => it.id === id);
  craft.removeSelf();
}

export async function removeAllCrafts(host) {
  const children = host.removeChildren(0);

  return new Promise((resolve, reject) => {
    if (host.children.length === 0) resolve(children);
  });
}

export function getCraft(host, id) {
  const craft = host.craftAll.find((it) => it.id === id);
  return craft;
}

function delay(time) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const waitFrameToStop = (frame) => {
  // stop after certain number of frames
  delay(frame).then(() => {
    window.it.stop();
  });
};
