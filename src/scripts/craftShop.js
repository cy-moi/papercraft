import BasicShape from '../crafts/BasicShape';
import MobileShape from '../crafts/MobileShape';
import ShootModule from '../crafts/ShootModule';
import EquipSlot from '../crafts/EquipSlot';
import AutoShape from '../crafts/AutoShape';
import AutoShooter from '../crafts/AutoShooter';

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
  {
    name: 'AutoShape',
    constructor: AutoShape,
  },
  {
    name: 'AutoShooter',
    constructor: AutoShooter,
  },
];

export default craftShop;
