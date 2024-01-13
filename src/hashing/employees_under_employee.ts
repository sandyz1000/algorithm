/* """
Find number of Employees Under every Employee
Given a dictionary that contains mapping of employee and his manager as a number of
(employee, manager) pairs like below.  

{ "A", "C" },
{ "B", "C" },
{ "C", "F" },
{ "D", "E" },
{ "E", "F" },
{ "F", "F" }

In this example C is manager of A, C is also manager of B, F is manager of C and so on.

----------------------------------------------------
Explanation:
----------------------------------------------------

Write a function to get no of employees under each manager in the hierarchy not just their
direct reports. It may be assumed that an employee directly reports to only one manager. In
the above dictionary the root node/ceo is listed as reporting to himself.

Output should be a Dictionary that contains following.

A - 0
B - 0
C - 2
D - 0
E - 1
F - 5


Solution:

1. Create a reverse map with Manager->DirectReportingEmployee combination. Off-course
employee will be multiple so Value in Map is List of Strings.
    "C" --> "A", "B",
    "E" --> "D"
    "F" --> "C", "E", "F"

2. Now use the given employee-manager map to iterate and at the same time use newly reverse
map to find the count of employees under manager.

    Let the map created in step 2 be 'mngrEmpMap'
    Do following for every employee 'emp'.
        a) If 'emp' is not present in 'mngrEmpMap'
            Count under 'emp' is 0 [Nobody reports to 'emp']
        b) If 'emp' is present in 'mngrEmpMap'
            Use the list of direct reports from map 'mngrEmpMap' and recursively calculate
            number of total employees under 'emp'.

A trick in step 2.b is to use memorization(Dynamic programming) while finding number of
employees under a manager so that we don't need to find number of employees again for any of
the employees. In the below code populateResultUtil() is the recursive function that uses
memoization to avoid re-computation of same results.
"""
 */
export class NumberEmployeeUnderManager {
    public result: { [key: string]: number } = {};

    populateResult(dataSet: { [key: string]: string }): void {
        const mngrEmpMap: { [key: string]: string[] } = {};

        for (const [emp, mngr] of Object.entries(dataSet)) {
            if (emp !== mngr) {
                const directReportList = mngrEmpMap[mngr] || [];
                directReportList.push(emp);
                mngrEmpMap[mngr] = directReportList;
            }
        }

        for (const mngr of Object.keys(dataSet)) {
            this.populateResultUtil(mngr, mngrEmpMap);
        }
    }

    private populateResultUtil(mngr: string, mngrEmpMap: { [key: string]: string[] }): number {
        if (!(mngr in mngrEmpMap)) {
            this.result[mngr] = 0;
            return 0;
        } else if (mngr in this.result) {
            return this.result[mngr];
        } else {
            const directReportEmpList = mngrEmpMap[mngr];
            let count = directReportEmpList.length;

            for (const directReportEmp of directReportEmpList) {
                count += this.populateResultUtil(directReportEmp, mngrEmpMap);
            }

            this.result[mngr] = count;
            return count;
        }
    }
}

if (require.main === module) {
    const dataSet: { [key: string]: string } = {
        "A": "C",
        "B": "C",
        "C": "F",
        "D": "E",
        "E": "F",
        "F": "F",
    };

    const nem = new NumberEmployeeUnderManager();
    nem.populateResult(dataSet);
    console.log("result =", nem.result);
}
