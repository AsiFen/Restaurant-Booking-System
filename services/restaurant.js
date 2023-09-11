const Restaurant = (db) => {
    let success;
    let errors_msg;
    async function getTables() {
        // get all the available tables
        let results = await db.any('SELECT * FROM table_booking')
        return results;
    }

    async function setBooked(table_name) {
        await db.none('UPDATE table_booking SET booked = true WHERE table_name = $1', [table_name]);
        return 'true'
    }
    async function bookTable(customer, phone_number, seats, table_name) {
        // book a table by name
        await db.none('UPDATE table_booking SET username = $1, number_of_people = $2, contact_number = $3, booked =$4 WHERE table_name = $5', [customer, seats, phone_number, 'true', table_name])
        await setBooked(table_name)
        return 'Table ' + table_name + ' is reserved.'
    }

    async function getBookedTables() {
        // get all the booked tables
        let result = await db.any('SELECT * FROM table_booking WHERE booked = true')
        return result;
    }

    async function isTableBooked(tableName) {
        // get booked table by name
        let result = await db.any('SELECT booked FROM table_booking WHERE table_name =$1', [tableName])
        // console.log(result[0]);
        if (result) {
            success = 'Table reserved successfully!'
        } else {
            errors_msg = 'Table is not available.'
        }
        return result[0].booked
    }

    async function cancelTableBooking(tableName) {
        // cancel a table by name
        await db.none('UPDATE table_booking SET username = null, number_of_people = null, contact_number = null, booked = false WHERE table_name = $1', [tableName]);
    
    }

    async function getBookedTablesForUser(username) {
        // get user table booking
    }
    async function editTableBooking() {

    }
    return {
        getTables,
        setBooked,
        bookTable,
        getBookedTables,
        isTableBooked,
        cancelTableBooking,
        editTableBooking,
        getBookedTablesForUser
    }
}

export default Restaurant;