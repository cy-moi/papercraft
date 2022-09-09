import BasicShape from '../crafts/BasicShape'
import MobileShape from '../crafts/MobileShape'
import ShootModule from '../crafts/ShootModule'

const craftShop = [
  {
    name: 'BasicShape',
    constructor: BasicShape
  },
  {
    name: 'MobileShape',
    constructor: MobileShape
  },
  {
    name: 'Weapon',
    constructor: ShootModule
  }
]

export default craftShop
