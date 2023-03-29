<script>
    // import {auth, provider} from './../../firebase.js';
    import {myuser} from './../../store';
    import {goto} from '$app/navigation';
    import App from '../../firebase'
    import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from 'firebase/auth'
	import { onMount } from 'svelte';
    import {getDatabase, ref, set, update} from "firebase/database";
    import googleIcon from '../../images/google.png'
    import logo from '../../images/logo.jpg'
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
                let data = {
                name: user.displayName,
                email: user.email,
                photoUrl: user.photoURL, 
                }
                try{
                    update(ref(db, 'users/'+user.uid), data)
                } catch(err){
                    console.log(err);
                }
                
                goto('/');
            }
        });
    })
</script>

    <div class="welcome">
        <div class="welcome_logo">
            <img src={logo} alt=""/>
        </div>
        <div class="welcome_head">Welcome to <span>CR ELEVEN</span> PAGE!</div>
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={handleGoogleLogin} class="googleLogin">
        <img alt="" src={googleIcon}/> <div class="text">Sign In with google</div>
    </div>

    <style>
        .welcome{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 30px;
        }

        .welcome_head{
            font-size: 20px;
            font-weight: bold;
        }

        .welcome_head span{
            background: -webkit-linear-gradient(#a11739, #6d1c59);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0px 3px 4px rgba(0,0,0,.5);
        }

        .welcome img{
            height: 100px;
        }

        .welcome_logo{
            height: 100px;
            width: 100px;
            border-radius: 50%;
            border: #d8d6d6 3px solid;
            overflow: hidden;
        }

        .googleLogin img{
            height: 25px;
        }

        .googleLogin{
            display: flex;
            gap: 10px;
            justify-content: center;
            align-items: center;
            background: rgb(60, 61, 78);
            border-radius: 5px;
            padding: 5px;
            color: #eee;
        }

        .googleLogin .text{
            font-size: 17px;
            font-weight: bold;
            
        }

    </style>

