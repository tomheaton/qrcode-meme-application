import {useRouter} from "next/router";
import QrCode from "react-qr-code";

const ProfilePage = () => {

    const router = useRouter();
    const { username } = router.query;

    return (
        <div className={"container"}>
            <h1 style={{textAlign: "center"}}>Profile</h1>
            <h2>{username}</h2>
            <QrCode value={`https://qrcode.tomheaton.dev/api/qrcode/${username}`}/>
        </div>
    );
}

export default ProfilePage;