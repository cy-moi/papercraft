export default function reset(carsConfig) {
    console.log('>>>>>>reset start<<<<<<')
    // Global tickcount & Timer Part
    try {
      // 1. Playground tick count.
      playground.reset()
      // 2. Global time panel reset.
      dashboard.reset()
      // 3. Car(s) 
      for (let car of carsConfig) {
        const theCar = getCraft(playground, car.id)
        theCar.reset()
      }
 
    } catch (error) {
      console.log('>>>>>>>>>Error in reset part<<<<<<<<< :::', error)
    }
}


