module.exports = [
    {
        id: 1,
        belongs_to: 1,//0 for us, otherwise belongs to user
        is_allocatable: false,
        is_active: true // If no longer in use
    },
    {
        id: 2,
        belongs_to: 1,//John Doe have a sensor
        is_allocatable: false,
        is_active: true
    },
    {
        id: 3,
        belongs_to: 0,
        is_allocatable: true,
        is_active: true
    },
    {
        id: 4,
        belongs_to: 0,
        is_allocatable: true,
        is_active: true
    },
    {
        id: 5,
        belongs_to: 0,
        is_allocatable: true,
        is_active: true
    },
    {
        id: 6,
        belongs_to: 0,
        is_allocatable: true,
        is_active: true
    }
]