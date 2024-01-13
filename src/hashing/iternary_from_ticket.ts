// """
// Find Itinerary from a given list of tickets
// Given a list of tickets, find itinerary in order using the given list.

// ==Example:==

// Input:
// "Chennai" -> "Bangalore"
// "Bombay" -> "Delhi"
// "Goa"    -> "Chennai"
// "Delhi"  -> "Goa"

// Output:
// Bombay->Delhi, Delhi->Goa, Goa->Chennai, Chennai->Banglore,
// It may be assumed that the input list of tickets is not cyclic and there is one ticket from every
// city except final destination.

// ------------------------------------------------
// Explanation:
// ------------------------------------------------

// One Solution is to build a graph and do Topological Sorting of the graph. Time complexity of this
// solution is O(n).

// We can also use hashing to avoid building a graph. The idea is to first find the starting point.
// A starting point would never be on 'to' side of a ticket. Once we find the starting point,
// we can simply traverse the given map to print itinerary in order.

// Algorithm:
// 1) Create a HashMap of given pair of tickets.  Let the created HashMap be 'dataset'. Every entry
// of 'dataset' is of the form "from->to" like "Chennai" -> "Banglore"

// 2) Find the starting point of itinerary.
//      a) Create a reverse HashMap.  Let the reverse be 'reverseMap' Entries of 'reverseMap' are of
//      the form "to->form". Following is 'reverseMap' for above example.
//         "Banglore"-> "Chennai"
//         "Delhi"   -> "Bombay"
//         "Chennai" -> "Goa"
//         "Goa"     ->  "Delhi"
//      b) Traverse 'dataset'.  For every key of dataset, check if it is there in 'reverseMap'. If a
//      key is not present, then we found the starting point. In the above example, "Bombay" is
//      starting point.

// 3) Start from above found starting point and traverse the 'dataset' to print itinerary.

// """

function printItinerary(dataSet: Record<string, string>): void {
    const reverseMap: Record<string, string> = {};

    // Fill reverse map
    for (const [key, value] of Object.entries(dataSet)) {
        reverseMap[value] = key;
    }

    let start: string | null = null;

    // Find the starting point of itinerary
    for (const key in dataSet) {
        if (!(key in reverseMap)) {
            start = key;
            break;
        }
    }

    // If we could not find a starting point, then something wrong with input
    if (start === null || start.trim() === "") {
        console.log("Invalid Input");
        return;
    }

    // Traverse the itinerary using the given hash map
    let to: string | null = dataSet[start];
    while (to !== null) {
        console.log(`${start} -> ${to}`);
        start = to;
        to = dataSet[to] || null;
    }
}

if (require.main === module) {
    // Output:
    // Bombay -> Delhi
    // Delhi -> Goa
    // Goa -> Chennai
    // Chennai -> Bangalore

    const dataSet: Record<string, string> = {
        "Chennai": "Bangalore",
        "Bombay": "Delhi",
        "Goa": "Chennai",
        "Delhi": "Goa"
    };

    printItinerary(dataSet);
}
