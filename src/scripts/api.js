import craftShop from '../scripts/craftShop'

export async function addCraft(config) {
  const { id, model, host, ...options } = config // Be only used to add cars.
  const craftModel = craftShop.find(it => it.name === model)
  const craft = new craftModel.constructor(id)
  host.addChild(craft)
  await craft.init(config)
  host.craftAll.push(craft)
  return craft
}

export function removeCraft(host, id) {
  const craft = host.craftAll.find(it => it.id === id)
  host.removeChild(craft);
}

export function removeAllCrafts(host) {
  const children = host.removeChildren(0);
  return children;
}

export function getCraft(host, id) {
  const craft = host.craftAll.find(it => it.id === id)
  return craft
}

function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

export const waitFrameToStop = (frame) => {	
	delay(frame).then(() => {
		console.log('ran after 1 second1 passed')
		it.setSpeed(0)
		it.setSteering(0)
	});
}