<script>
	import { onDestroy, onMount } from 'svelte';
	import { myuser, allUser } from '../store';
	import { goto } from '$app/navigation';
	import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
	import App from '../firebase';
	import { getDatabase, ref, set, onValue, update} from 'firebase/database';
	import ProfileCard from '../components/ProfileCard.svelte';
	import UserList from '../components/UserList.svelte';
	const db = getDatabase(App);
	const auth = getAuth(App);

	let me;
	let users;

	const unsubscribe = myuser.subscribe(async (data) => {
		//console.log(data);
		me = data;
	});

	const un = allUser.subscribe(async (data) => {
		users = data.users;
		console.log(users);
	})

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
						sms: (snap.val().sms==undefined) ? null : snap.val().sms,
					});
				});

				onValue(ref(db, 'users'), (snap) => {
					let u = [];
					snap.forEach(item=>{
						//console.log(item.val());
						u.push(item.val());
					});

					allUser.set({
						users: u
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
<ProfileCard sms={me.sms} name={me.name} avatar={me.photoUrl} id={me.id} phone={me.phone} blood={me.blood} formal_name={me.formal_name} email={me.email}>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div slot="edit_slot" on:click={gotoEdit} class="edit_button">Edit</div>
</ProfileCard>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- <center><div class="logoutButton" on:click={logout}>Sign Out</div></center> -->
{:else}
<center>
	<div class="loader">Loading...</div>
</center>
{/if}

{#if users.length>0}
<div class="count">ALL ({users.length})</div>
 {#each users as user}
	<UserList name={user.formal_name ? user.formal_name : user.name} photoUrl={user.photoUrl} phone={user.phone? user.phone : 'Not Provided!'} sms={user.sms ? user.sms : 'OFF'}/>
 {/each}
{:else}
<center>
	<div class="loader">Loading...</div>
</center>
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

	.count{
		font-size: 17px;
		font-weight: bold;
		margin: 10px 5px;
	}
	

</style>