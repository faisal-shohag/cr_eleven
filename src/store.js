import { writable } from 'svelte/store';

export const myuser = writable({
	loggedIn: false,
	name: null,
	email: null,
	id: null,
	token: null,
	avatar: null,
	lastLogin: null,
	createdAt: null,
	updatedAt: null,
	deletedAt: null,
	phone: null
});
