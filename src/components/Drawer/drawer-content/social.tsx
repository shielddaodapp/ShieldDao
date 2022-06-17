import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../../assets/icons/github.svg";
import { ReactComponent as Twitter } from "../../../assets/icons/twitter.svg";
import { ReactComponent as Telegram } from "../../../assets/icons/telegram.svg";
import { ReactComponent as Discord } from "../../../assets/icons/discord.svg";
import { ReactComponent as Youtube } from "../../../assets/icons/youtube.svg";

export default function Social() {
    return (
        <div className="social-row">
            <Link href="https://github.com/Wonderland-Money/wonderland-frontend" target="_blank">
                <SvgIcon color="primary" component={GitHub} />
            </Link>

            <Link href="https://twitter.com/Shield__DAO" target="_blank">
                <SvgIcon color="primary" component={Twitter} />
            </Link>

            <Link href="https://t.me/shield_reserve" target="_blank">
                <SvgIcon viewBox="0 0 32 32" color="primary" component={Telegram} />
            </Link>

            <Link href="https://www.youtube.com/watch?v=gx09Voo4yOM&t=1s" target="_blank">
                <SvgIcon component={Youtube} />
                {/* <img src="../../../assets/icons/discord.svg" alt="" /> */}
            </Link>
        </div>
    );
}
