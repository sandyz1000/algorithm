
/* How to design a parking lot using object-oriented principles?

Design a parking lot using object-oriented principles.

Asked In : Amazon, Apple, Google and many more interviews

Solution: For our purposes right now, we'll make the following assumptions. We made these
specific assumptions to add a bit of complexity to the problem without adding too much. If you
made different assumptions, that's totally fine.

1) The parking lot has multiple levels. Each level has multiple rows of spots.
2) The parking lot can park motorcycles, cars, and buses.
3) The parking lot has motorcycle spots, compact spots, and large spots.
4) A motorcycle can park in any spot.
5) A car can park in either a single compact spot or a single large spot.
6) A bus can park in five large spots that are consecutive and within the same row. It cannot park
in small spots.

In the below implementation, we have created an abstract class Vehicle, from which Car, Bus,
and Motorcycle inherit. To handle the different parking spot sizes, we have just one class
ParkingSpot which has a member variable indicating the size.
 */


// Vehicle and its inherited classes.
enum VehicleSize {
    Motorcycle = 1,
    Compact = 2,
    Large = 3,
}

abstract class Vehicle {
    parkingSpots: ParkingSpot[] = [];
    licensePlate: string = "";
    spotsNeeded: number = 0;
    size: VehicleSize | null = null;

    abstract canFitInSpot(spot: ParkingSpot): boolean;

    getSpotsNeeded(): number {
        return this.spotsNeeded;
    }

    getSize(): VehicleSize | null {
        return this.size;
    }

    parkInSpot(spot: ParkingSpot): void {
        this.parkingSpots.push(spot);
    }

    clearSpots(): void {
        // Remove vehicle from spot, and notify spot that it's gone
    }
}

class Bus extends Vehicle {
    constructor() {
        super();
        this.spotsNeeded = 5;
        this.size = VehicleSize.Large;
    }

    canFitInSpot(spot: ParkingSpot): boolean {
        // Implementation for Bus
        return false;
    }
}

class Car extends Vehicle {
    constructor() {
        super();
        this.spotsNeeded = 1;
        this.size = VehicleSize.Compact;
    }

    canFitInSpot(spot: ParkingSpot): boolean {
        // Implementation for Car
        return false;
    }
}

class Motorcycle extends Vehicle {
    constructor() {
        super();
        this.spotsNeeded = 1;
        this.size = VehicleSize.Motorcycle;
    }

    canFitInSpot(spot: ParkingSpot): boolean {
        // Implementation for Motorcycle
        return false;
    }
}
/* 
The ParkingLot class is essentially a wrapper class for an array of Levels. By implementing
  it this way, we are able to separate out logic that deals with actually finding free spots
  and parking cars out from the broader actions of the ParkingLot. If we didn't do it this way,
  we would need to hold parking spots in some sort of double array (or hash table which maps
  from a level number to the list of spots). It's cleaner to just separate ParkingLot from Level.
*/
class ParkingLot {
    levels: Level[] = [];
    NUM_LEVELS: number = 5;

    parkVehicle(vehicle: Vehicle): boolean {
        // Implementation for ParkingLot
        return false;
    }
}

class Level {
    spots: ParkingSpot[] = [];
    floor: number;
    availableSpots: number;

    constructor(floor: number, numberSpots: number) {
        this.floor = floor;
        this.availableSpots = numberSpots;
    }

    parkVehicle(vehicle: Vehicle): boolean {
        // Implementation for Level
        return false;
    }

    parkStartingAtSpot(num: number, vehicle: Vehicle): void {
        // Implementation for Level
    }

    findAvailableSpots(vehicle: Vehicle): number {
        // Implementation for Level
        return -1;
    }

    spotFreed(): void {
        this.availableSpots += 1;
    }
}

/* 
The ParkingSpot is implemented by having just a variable which represents the size of the spot.
  We could have implemented this by having classes for LargeSpot, CompactSpot,
  and MotorcycleSpot which inherit from ParkingSpot, but this is probably overkilled. The spots
  probably do not have different behaviors, other than their sizes.
*/
class ParkingSpot {
    level: Level;
    row: number;
    spotNumber: number;
    spotSize: VehicleSize;
    vehicle: Vehicle | null = null;

    constructor(level: Level, row: number, spotNumber: number, spotSize: VehicleSize) {
        this.level = level;
        this.row = row;
        this.spotNumber = spotNumber;
        this.spotSize = spotSize;
    }

    isAvailable(): boolean {
        return this.vehicle === null;
    }

    canFitVehicle(vehicle: Vehicle): boolean {
        // Implementation for ParkingSpot
        return false;
    }

    park(vehicle: Vehicle): void {
        // Implementation for ParkingSpot
    }

    removeVehicle(): void {
        // Implementation for ParkingSpot
    }
}

