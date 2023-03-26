<script>
	import { onDestroy, onMount } from 'svelte';
	import { myuser } from '../store';
	import { goto } from '$app/navigation';
	import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
	import App from '../firebase';
	import { getDatabase, ref, set, onValue } from 'firebase/database';
	import ProfileCard from '../components/ProfileCard.svelte';
	const db = getDatabase(App);
	const auth = getAuth(App);

	let me;

	const unsubscribe = myuser.subscribe(async (data) => {
		console.log(data);
		me = data;

	});

	onDestroy(unsubscribe);

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				//console.log('User is logged in!', user);
				//myuser.set({ ...user, loggedIn: true });
				onValue(ref(db, 'users/' + user.uid), (snap) => {
					myuser.set({
						...snap.val(), 
						loggedIn: true, 
						uid: user.uid, 
						phone: (snap.val().phone==undefined) ? null : snap.val().phone,
						id: (snap.val().id==undefined) ? null : snap.val().id,
						blood: (snap.val().blood==undefined) ? null : snap.val().blood,
						formal_name: (snap.val().formal_name==undefined) ? null : snap.val().formal_name,
					});
				});
			} else {
				console.warn('User is not logged in!');
				goto('/login');
			}
		});
		
	});

	const logout = () => {
		signOut(auth);
		myuser.set({ loggedIn: false });
	};

	const gotoEdit =()=>{
		goto('/edit');
	}
</script>


{#if me.loggedIn}
<ProfileCard name={me.name} avatar={me.photoUrl} id={me.id} phone={me.phone} blood={me.blood} formal_name={me.formal_name}>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div slot="edit_slot" on:click={gotoEdit} class="edit_button">Edit</div>
</ProfileCard>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<center><div class="logoutButton" on:click={logout}>Sign Out</div></center>

{/if}



<style>
	.logoutButton{
		padding: 5px;
		margin: 10px 10px;
		background: orangered;
		color: #eee;
		font-weight: bold;
		border-radius: 5px;
		cursor: pointer;
		
	}
	.edit_button{
		text-align: center;
		margin-top: 10px;
		background: rgb(241, 245, 242);
		color: #3f3c3c;
		font-weight: bold;
		border-radius: 10px;
		cursor: pointer;
	}
</style>