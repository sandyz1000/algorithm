
/* Dynamic Programming | Set 22 (Box Stacking Problem)

You are given a set of n types of rectangular 3-D boxes, where the i^th box has height h(i),
width w(i) and depth d(i) (all real numbers). You want to create a stack of boxes which is as
tall as possible, but you can only stack a box on top of another box if the dimensions of the 2-D
base of the lower box are each strictly larger than those of the 2-D base of the higher box. Of
course, you can rotate a box so that any side functions as its base. It is also allowable to use
multiple instances of the same type of box

REFER DIAGRAM
http://www.geeksforgeeks.org/dynamic-programming-set-21-box-stacking-problem/


MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWXkdc;cldOXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMWN0xoc;::c:::;cokKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMXd:;:lllllllllllc:;:xNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMM0:,:::coddddddoc:::,cKMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMM0clxdlcccllcccccodxllKMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMM0ldOOOOkxc;cdxkOOOOo:xNWMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMWKkc;d000000dcx0000000d,;ldkKWMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMM0:'',:ox0KXXklkXXXKOxoc:c:,':0MMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMWXo;cc:;,,:ox0kokKOxolc:::::cc;oXWMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMWKkoc',oxxdocc;,::;colccccccodxxo,'cokKWMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMWXOdl::cc;;dkkkkkkdoc::cccclodkkkkkkd;;cc::ldOXWMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMWKkoc::cllll;;xOOOOOOOOOkl;;lkOOOOOOOOOx;;llllc::ldkKWMMMMMMMMMMMMM
MMMMMMMMMMMM0c,;clooooool;:k0000000000xccx0000000000k:;loooololc;,c0MMMMMMMMMMMM
MMMMMMMMMMMWx,;;;:clooooo:;d0KKKKKKKKKxccxKKKKKKKKK0d;:ooooolc:;;;,xWMMMMMMMMMMM
MMMMMMMMMMMMx:oolc:::clodocclox0XXXXXXkllkXXXXXX0xolccodolc:::cloo:xMMMMMMMMMMMM
MMMMMMMMMMMWx:oddddolc::clodolclox0XNNOooONNX0xolclodolc::cloddddo:xMMMMMMMMMMMM
MMMMMMMMMMMMx:dxdxddxxdolc:ccoddollodOkookOdolloddocc:clodxxddxdxd:xMMMMMMMMMMMM
MMMMMMMMMMMMxcdxxxxxxxxxxxdoccccodxdolc::clodxdoccccodxxxxxxxxxxxdcxMMMMMMMMMMMM
MMMMMMMMMMMWxcxkkxkkkkkkkkkxxxdlcccldxxxxxxdlcccldxxxkkkkkkkkkkkkxcxWMMMMMMMMMMM
MMMMMMMMMMMWxcxkkkkkkkkkkkkkkkkkkxolccllllccloxkkkkkkkkkkkkkkkkkkxcxWMMMMMMMMMMM
MMMMMMMMMMWKlckOOOOOOOOOOOOOOOOOOkkOkxc,,cxkOkkOOOOOOOOOOOOOOOOOOkclKWMMMMMMMMMM
MMMMMMMN0xoc':kOOOOOOOOOOOOOOOOOOOOOOOd::dOOOOOOOOOOOOOOOOOOOOOOOk:'cox0NMMMMMMM
MMMWXOdl::cl;cO000000000000000000000O0dccd0O000000000000000000000kc;cc::ldOXWMMM
N0koc:clllll;cO00000000000000000000000xccx00000000000000000000000Oc;lllllc:cokKN
;,:clooolool;cO00K00KKKKKKKKKKKKKK0K0KxccxK0KKKKKKKKKKKKKKK000K00Oc;loooooolc;,;
':;;:clooooo::x0KKKKKKKKKKKKKKKKKKKKKKkllkKKKKKKKKKKKKKKKKKKKKKK0x::ooooolc:;;:'
;ool::::cloolcclox0KXXKKXXXXXXXKXXXXXXkllkXXXXXXKXXXXXXXKKXXK0xolccloolc:;::loo;
;odddooc::::lodolccodOKXXXXXXXXXXXXXXXkllkXXXXXXXXXXXXXXXKOdocclodol::::coooddo;
;dddddddddlc:::coddoccldkKXNNXNNNNNXXNOllONXXNNNNNXNNXKkdlccoddoc:::clddddddddd;
;ddddddddddddolc::cldddlclox0XNNNNNNNNOooONNNNNNNNX0xolcldddlc::clodddddddddddd;
;dxxxddddddxddxxdocc:cloddolloxOXNWNWWOooOWWNWNXOxolloddolc:ccodxxdddddddddxxxd;
:xxxxxxxxxxxxxxxxxxxdlccccodxdolodkKNW0oo0WNKkdolodxdoccccldxxxxxxxxxxxxxxxxxxx:
:xxxxxxxxxxxxxxxxxxxxxxxolcccldxxolodkdccdkdoloxxdlcccloxxxxxxxxxxxxxxxxxxxxxxx:
:xkkkkkkxxxxxxxxxkkkkxxkkkxdocccldxxdoc::codxxdlcccodxkkkxkkkkkkxxxxxxxxkkkkkkx:
:kkkkkkkkkkkkkkkkkkkkkkkkkkkkkxdlccloxkkkkxolccldxkkkkkkkkkkkkkkkkkkkkkkkkkkkkk:
:kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkxolllccllloxkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkc
ckkOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkkOkdccdkOkOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkc
cOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOdccdOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOc
cOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOdccdOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOc
cO00000000000000000000000000000O0O0000dccd0000O0O00000000000000000000000000000Oc
l0000000000000000000000000000000000000dccd0000000000000000000000000000000000000l
l0000000000000000000000000000000000000dccd0000000000000000000000000000000000000l
l0K0KKKKKKKKKKKKKKKKKKKKKKKKKKKK0KK0KKdccdKK0KKKKKKKKKKKKKKKKKKKKKKK0KKKKKKK0K0l
lKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKdccdKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKl
oxk0KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKdccdKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK0kxo
N0kxxxOKXXKKXXXXXXXXXXXXXXXXXXXXXXXXXXdccdXKXXXXXXXXXXXXXXXXXXXXXXXXKKXXKOxxxk0N
MMMWXOkxxOKXXXXXXXXXXXXXXXXXXXXXXXXXXXdccdXXXXXXXXXXXXXXXXXXXXXXXXXXXKOxxkOXWMMM
MMMMMMMN0kxxk0XXXXXXXXXXXXXXXXXXXXXXXXdccdXXXXXXXXXXXXXXXXXXXXXXXX0kxxk0NMMMMMMM
MMMMMMMMMMWXOkxxOKNNNNNNNXXNNNNNXNNXXNdccdNXXNNXNNNNNXXNNNNNNNKOxxkOXWMMMMMMMMMM
MMMMMMMMMMMMMWN0kkkOKNNNNNNNNNNNNNNNNNOooONNNNNNNNNNNNNNNNNKOkkk0NWMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMWKOkkk0XNNNNNNNNNNNNNOooONNNNNNNNNNNNNX0kkkOKWMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMWN0kkkOXNWWWWWWWWWOooOWWWWWWWWWNXOkkk0NWMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMWKOkkkKNWWWWWW0oo0WWWWWWNKkkkOKWMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMWX0kkk0XWWW0oo0WWWX0kkk0XWMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKOkkOKOddOKOkkOKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWX0kdlldk0XWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNKKNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM

---------------------------------------------
Explanation:
---------------------------------------------

The Box Stacking problem is a variation of LIS problem. We need to build a maximum height stack.

Following are the key points to note in the problem statement:
1) A box can be placed on top of another box only if both width and depth (Area=width*depth) of
the upper placed box are smaller than width and depth of the lower box respectively.

2) We can rotate boxes. For example, if there is a box with dimensions {1x2x3} where 1 is height,
2×3 is base, then there can be three possibilities, {1x2x3}, {2x1x3} and {3x1x2}.

3) We can use multiple instances of boxes. What it means is, we can have two different rotations of
a box as part of our maximum height stack.

Following is the solution based on DP solution of LIS problem.

1) Generate all 3 rotations of all boxes. The size of rotation array becomes 3 times the size of
original array. For simplicity, we consider depth as always smaller than or equal to width.

2) Sort the above generated 3n boxes in decreasing order of base area.

3) After sorting the boxes, the problem is same as LIS with following optimal substructure property.
MSH(i) = Maximum possible Stack Height with box i at top of stack
MSH(i) = { Max ( MSH(j) ) + height(i) } where j < i and width(j) > width(i) and depth(j) > depth(i).
If there is no such j then MSH(i) = height(i)

4) To get overall maximum height, we return max(MSH(i)) where 0 < i < n

 */

// Dynamic Programming implementation of Box Stacking problem

class Box {
    h: number;
    w: number;
    d: number;

    constructor(h: number, w: number, d: number) {
        this.h = h;
        this.w = w;
        this.d = d;
    }
}

function maxStackHeight(arr: Box[], n: number): number {
    const rot: Box[] = new Array(3 * n);

    let index = 0;
    for (let i = 0; i < n; i++) {
        rot[index] = arr[i];
        index++;

        rot[index] = new Box(arr[i].w, Math.min(arr[i].h, arr[i].d), Math.max(arr[i].h, arr[i].d));
        index++;

        rot[index] = new Box(arr[i].d, Math.min(arr[i].h, arr[i].w), Math.max(arr[i].h, arr[i].w));
        index++;
    }

    // Now the number of boxes is 3n
    n = 3 * n;

    rot.sort((a, b) => (b.d * b.w) - (a.d * a.w));

    for (let i = 0; i < n; i++) {
        console.log(`${rot[i].h} x ${rot[i].w} x ${rot[i].d}`);
    }

    const msh: number[] = new Array(n).fill(0).map((_, i) => rot[i].h);

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (rot[i].w < rot[j].w && rot[i].d < rot[j].d && msh[i] < msh[j] + rot[i].h) {
                msh[i] = msh[j] + rot[i].h;
            }
        }
    }

    return Math.max(...msh);
}

function maxStackHeightRec(arr: Box[], n: number): number {
    function lis(arr: Box[], n: number): number {
        let maxUntilNow = arr[n - 1].h;
        for (let i = 1; i < n; i++) {
            const res = lis(arr, i);
            if (arr[i - 1].d > arr[n - 1].d && arr[i - 1].w > arr[n - 1].w && res + arr[i - 1].h > maxUntilNow) {
                maxUntilNow = res + arr[i - 1].h;
            }
        }

        // Compare maxUntilNow with overall maximum. And update the overall maximum if needed
        const maximum = Math.max(lis.maximum, maxUntilNow);
        return maximum;
    }

    lis.maximum = 0;

    const rot: Box[] = new Array(3 * n);

    let index = 0;
    for (let i = 0; i < n; i++) {
        rot[index] = arr[i];
        index++;

        rot[index] = new Box(arr[i].w, Math.min(arr[i].h, arr[i].d), Math.max(arr[i].h, arr[i].d));
        index++;

        rot[index] = new Box(arr[i].d, Math.min(arr[i].h, arr[i].w), Math.max(arr[i].h, arr[i].w));
        index++;
    }

    // Now the number of boxes is 3n
    n = 3 * n;

    rot.sort((a, b) => (b.d * b.w) - (a.d * a.w));

    for (let i = 0; i < n; i++) {
        console.log(`${rot[i].h} x ${rot[i].w} x ${rot[i].d}`);
    }

    return lis(rot, n);
}

if (require.main === module) {
    const arr: Box[] = [new Box(4, 6, 7), new Box(1, 2, 3), new Box(4, 5, 6), new Box(10, 12, 32)];
    console.log(`The maximum possible height of stack is ${maxStackHeight(arr, arr.length)}`);
    // console.log(`The maximum possible height of stack is ${maxStackHeightRec(arr, arr.length)}`);
}
