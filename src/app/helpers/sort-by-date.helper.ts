/**
   * sortByYearAndMonth - Sorts the data by year and month
   * @param data - Array of data objects
   * @returns Sorted array with latest dates first
   */
export const sortByYearAndMonth = (data: any[]): any[] => {
    const monthOrder: { [key: string]: number } = {
        Jan: 1, January: 1,
        Feb: 2, February: 2,
        Mar: 3, March: 3,
        Apr: 4, April: 4,
        May: 5,
        Jun: 6, June: 6,
        Jul: 7, July: 7,
        Aug: 8, August: 8,
        Sep: 9, September: 9,
        Oct: 10, October: 10,
        Nov: 11, November: 11,
        Dec: 12, December: 12
    };

    return data.sort((a: any, b: any) => {
        if (!a.date || !b.date) return 0;

        const [monthA, yearA] = a.date.split(" ");
        const [monthB, yearB] = b.date.split(" ");
        const numYearA = parseInt(yearA, 10);
        const numYearB = parseInt(yearB, 10);

        if (numYearA !== numYearB) {
            return numYearB - numYearA; // Sort by year first (latest first)
        } else {
            const monthNumA = monthOrder[monthA] || 0;
            const monthNumB = monthOrder[monthB] || 0;
            return monthNumB - monthNumA; // Then by month (latest first)
        }
    });
}

/**
 * sortByTenure - Sorts the data by tenure, with the latest tenure first
 * @param data - Array of data objects with a 'tenure' property e.g. "Jan 2020 - Present" | "Jan 2019 - Dec 2020"
 * @returns Sorted array of data objects
 */
export const sortByTenure = (data: any[]): any[] => {
    const sorted = Object.values(data).sort((a: any, b: any) => {
        const getStartDate = (tenure: string) => {
            const [start] = tenure.replace('Present', new Date().getFullYear().toString()).split(' - ');
            return new Date(start + ' 01');
        };
        return getStartDate(a.tenure).getTime() - getStartDate(b.tenure).getTime();
    });

    // Reverse the order to have the latest first
    sorted.reverse();

    return sorted;
}