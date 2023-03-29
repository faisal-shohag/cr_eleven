<script>
    import { myuser } from '../store';
    import { onDestroy, onMount } from 'svelte';
    import App from '../firebase';
    import { goto } from '$app/navigation';
	import { getDatabase, ref, set, onValue, update } from 'firebase/database';
    const db = getDatabase(App);
    let name;
    let id;
    let phone;
    let blood;
    let uid;
    const unsubscribe = myuser.subscribe(async (data) => {
		console.log(data);
		name = data.formal_name;
        blood = (data.blood==null) ? '' : data.blood;
        id = (data.id==null) ? '' : data.id;
        phone = (data.phone==null) ? '' : data.phone;
        uid = data.uid;
	});
    onDestroy(unsubscribe);

    const handleSubmit = async () =>{
          const data = {
            formal_name: name,
            id: id,
            phone: phone,
            blood: blood.toUpperCase()
          }
          try{
          await update(ref(db, 'users/'+uid), data);
          goto('/');
          } catch(err){
            console.log(err);
          }
    }
</script>

<div class="form-container">
<form class="form" on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
    <input type="text" id="name"  class="form-control" placeholder="Your full name..." bind:value={name}>
    </div>
    <div class="form-group">
    <input type="text" class="form-control" placeholder="Your class ID..." bind:value={id}>
    </div>

    <div class="form-group">
    <input type="text" class="form-control" placeholder="Your valid phone number..." bind:value={phone}>
    </div>
    <div class="form-group">
    <input type="text" class="form-control" placeholder="Your blood group" bind:value={blood}>
    </div>
    <center><button class="btn btn-primary">Save Info.</button></center>
</form>
</div>

<style>
    .form-container{
        padding: 10px;
    }

    .form{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>