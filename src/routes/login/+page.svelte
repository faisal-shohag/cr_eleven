<script>
    // import {auth, provider} from './../../firebase.js';
    import {myuser} from './../../store';
    import {goto} from '$app/navigation';
    import App from '../../firebase'
    import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from 'firebase/auth'
	import { onMount } from 'svelte';
    import {getDatabase, ref, set} from "firebase/database";
   const db = getDatabase(App);

    const auth = getAuth(App);
    const handleGoogleLogin = async () => {
       try{
        await signInWithPopup(auth, new GoogleAuthProvider());
       } catch(err){
        console.log(err);
       }
    }

    onMount(async () => {
        const auth = getAuth(App);
        onAuthStateChanged(auth, (user) => {
            console.log(user);
            if(user){
                myuser.set({...user, loggedIn: true});
                set(ref(db, 'users/'+user.uid), {
                name: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,              
                })
                goto('/');
            }
        });
    })
</script>

<h2>
    <button class="googleLogin" on:click={handleGoogleLogin}>Google</button>
</h2>