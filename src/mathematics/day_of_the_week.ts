function dayOfWeek(d: number, m: number, y: number): number {
    const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
    y -= m < 3 ? 1 : 0;
    return (y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + t[m - 1] + d) % 7;
}

if (require.main === module) {
    const day = dayOfWeek(30, 8, 2010);
    console.log(day);
}
