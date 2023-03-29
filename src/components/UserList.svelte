<script>
    export let name;
    export let photoUrl;
    export let phone;
    export let sms;
</script>

<div class="user">
    <div class="user_avatar"><img src={photoUrl} alt=""></div>
    <div class="user_info">
        <div class="user_name">{name}</div>
        <div class="user_phone">Phone: {phone}</div>
        <div class="user_sms">SMS Status: <span class="{(sms && sms=='ON') ? 'green' : 'red'}">{sms}</span></div>
    </div>
</div>

<style>
    .user{
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        padding: 5px;
        border-radius: 5px;
        margin: 5px 5px;
    }

    .user_avatar{
        height: 50px;
        width: 50px;
        border-radius: 50%;
        overflow: hidden;
    }

    .user_avatar img{
        height: 50px;
        width: 50px;
    }

    .user_name{
        font-weight: bold;
    }

    .user_phone{
        font-size: 13px;
    }

    .user_sms{
        font-size: 15px;
    }

    .red{
        color: orangered;
        font-weight: bold;
    }

    .green{
        color: yellowgreen;
        font-weight: bold;
    }

</style>