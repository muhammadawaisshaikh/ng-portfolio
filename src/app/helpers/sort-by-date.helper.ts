/**
   * sortByYearAndMonth - Sorts the data by year and month
   * @param data - Array of data objects
   * @returns 
   */
export const sortByYearAndMonth = (data: any[]): any[] => {
    const monthOrder: { [key: string]: number } = {
        Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
        Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
    };

    return data.sort((a: any, b: any) => {
        const [monthA, yearA] = a.date.split(" ");
        const [monthB, yearB] = b.date.split(" ");
        const numYearA = parseInt(yearA, 10);
        const numYearB = parseInt(yearB, 10);

        if (numYearA !== numYearB) {
            return numYearB - numYearA; // Sort by year first (latest first)
        } else {
            return monthOrder[monthB] - monthOrder[monthA]; // Then by month (latest first)
        }
    });
}