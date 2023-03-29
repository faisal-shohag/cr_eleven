<script>
    import sign_out from '../images/sign_out.png';
    import { goto } from '$app/navigation';
	import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
	import App from '../firebase';
    // import { createEventDispatcher } from "svelte";
    // let dispatch = createEventDispatcher();

	const auth = getAuth(App);
    
    export let avatar;
    export let name;
    export let formal_name;
    export let id;
    export let phone;
    export let blood;
    export let email;
    export let sms;

    const logout = () => {
		signOut(auth);
		myuser.set({ loggedIn: false });
	};

</script>

<div class="profile_card">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="sign_out" on:click={logout}><img src={sign_out} alt=""/></div>
    <div class="profile_head">
<div class="avatar"><img alt="" src="{avatar}"/></div>
<div class="name">{name}</div>
</div>

<div class="profile_table">
    <div class="row">
        <div class="col">Name</div>
        <div class="col">{formal_name==null ? 'Not Provided!': formal_name}</div>
    </div>

    <div class="row">
        <div class="col">ID</div>
        <div class="col">{id==null ? 'Not Provided!': id}</div>
    </div>
    <div class="row">
        <div class="col">Phone</div>
        <div class="col">{phone==null ? 'Not Provided':phone}</div>
    </div>
    <div class="row">
        <div class="col">Blood</div>
        <div class="col">{blood==null ? 'Not Provided' : blood}</div>
    </div>

    <div class="row">
        <div class="col">Email</div>
        <div class="col email">{email==null ? 'Not Provided' : email}</div>
    </div>

    <div class="row">
        <div class="col">SMS</div>
        <div class="col email">{sms==null ? 'Off' : sms}</div>
    </div>
</div>
<slot name="edit_slot"/>
</div>



<style>
.profile_card{
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    padding: 10px;
    border-radius: 10px;
    background: #4776E6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #8E54E9, #4776E6);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #8E54E9, #4776E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    position: relative;
    
}

.profile_head{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #eee;
}

.avatar {
    height: 70px;
    width: 70px;
    overflow: hidden;
    border-radius: 50%;
    border: 3px solid #dddcdc;
    display: flex;
    justify-content: center;
    align-items: center;
}

.avatar img{
    height: 70px;
    width: 70px;
}

.name{
    font-size: 20px;
    font-weight: bold;
}

.profile_table{
    margin-top: 10px;
}

.email{
    font-size: 12px;
}

.row{
    display: flex;
    justify-content: space-between;
    /* width: 100%; */
    border-bottom: dotted #1539db 1px;
    color: #eee;
    align-items: center;
}

.sign_out{
    position: absolute;
    right: 5%;
    top: 5%;
}

.sign_out img{
    height: 35px;
}
</style>