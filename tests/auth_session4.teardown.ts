import {test as teardown } from '@playwright/test';

teardown('delete user.json', async ({}) => {
    console.log("Delete user.json file successfully!")
})

