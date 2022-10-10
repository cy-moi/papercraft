import BasicShape from '../crafts/BasicShape';
import MobileShape from '../crafts/MobileShape';
import ShootModule from '../crafts/ShootModule';
import EquipSlot from '../crafts/EquipSlot';

const craftShop = [
  {
    name: 'BasicShape',
    constructor: BasicShape,
  },
  {
    name: 'MobileShape',
    constructor: MobileShape,
  },
  {
    name: 'Weapon',
    constructor: ShootModule,
  },
  {
    name: 'WeaponSlot',
    constructor: EquipSlot,
  },
];

export default craftShop;
