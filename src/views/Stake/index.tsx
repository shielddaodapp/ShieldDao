import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, InputAdornment, OutlinedInput, Zoom } from "@material-ui/core";
import RebaseTimer from "../../components/RebaseTimer";
import { trim } from "../../helpers";
import { changeStake, changeApproval } from "../../store/slices/stake-thunk";
import "./stake.scss";
import { useWeb3Context } from "../../hooks";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { messages } from "../../constants/messages";
import classnames from "classnames";
import { warning } from "../../store/slices/messages-slice";
import { useTranslation } from "react-i18next";

function Stake() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();

    const [view, setView] = useState(0);
    const [quantity, setQuantity] = useState<string>("");

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const currentIndex = useSelector<IReduxState, string>(state => {
        return state.app.currentIndex;
    });
    const fiveDayRate = useSelector<IReduxState, number>(state => {
        return state.app.fiveDayRate;
    });
    const timeBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.time;
    });
    const memoBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.memo;
    });
    const stakeAllowance = useSelector<IReduxState, number>(state => {
        // console.log(99999, state.account.staking && state.account.staking.time);

        return state.account.staking && state.account.staking.time;
    });
    const unstakeAllowance = useSelector<IReduxState, number>(state => {
        return state.account.staking && state.account.staking.memo;
    });
    const stakingRebase = useSelector<IReduxState, number>(state => {
        return state.app.stakingRebase;
    });
    const stakingAPY = useSelector<IReduxState, number>(state => {
        return state.app.stakingAPY;
    });
    const stakingTVL = useSelector<IReduxState, number>(state => {
        return state.app.stakingTVL;
    });

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const setMax = () => {
        if (view === 0) {
            setQuantity(timeBalance);
        } else {
            setQuantity(memoBalance);
        }
    };

    const onSeekApproval = async (token: string) => {
        if (await checkWrongNetwork()) return;

        await dispatch(changeApproval({ address, token, provider, networkID: chainID }));
    };

    const onChangeStake = async (action: string) => {
        if (await checkWrongNetwork()) return;
        if (quantity === "" || parseFloat(quantity) === 0) {
            dispatch(warning({ text: action === "stake" ? messages.before_stake : messages.before_unstake }));
        } else {
            await dispatch(changeStake({ address, action, value: String(quantity), provider, networkID: chainID }));
            setQuantity("");
        }
    };

    const hasAllowance = useCallback(
        token => {
            if (token === "time") return stakeAllowance > 0;
            if (token === "memo") return unstakeAllowance > 0;
            return 0;
        },
        [stakeAllowance],
    );

    const changeView = (newView: number) => () => {
        setView(newView);
        setQuantity("");
    };

    const trimmedMemoBalance = trim(Number(memoBalance), 6);
    const trimmedStakingAPY = trim(stakingAPY * 100, 1);

    const stakingRebasePercentage = trim(stakingRebase * 100, 4);
    const nextRewardValue = trim((Number(stakingRebasePercentage) / 100) * Number(trimmedMemoBalance), 6);

    return (
        <div className="stake-view">
            <Zoom in={true}>
                <div className="stake-card">
                    <Grid className="stake-card-grid" container direction="column" spacing={2}>
                        <Grid item>
                            <div className="stake-card-header">
                                <p className="stake-card-header-title">SDD {t("stake")} (3, 3)</p>
                                <RebaseTimer />
                            </div>
                        </Grid>

                        <Grid item>
                            <div className="stake-card-metrics">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                        <div className="stake-card-apy">
                                            <p className="stake-card-metrics-title">{t("apy")}</p>
                                            <p className="stake-card-metrics-value">
                                                {stakingAPY ? (
                                                    <>
                                                        {new Intl.NumberFormat("en-US").format(Number(trimmedStakingAPY) > 999999999999 ? 999999999999 : Number(trimmedStakingAPY))}
                                                        %
                                                    </>
                                                ) : (
                                                    // <Skeleton width="150px" />
                                                    "8612%"
                                                )}
                                            </p>
                                        </div>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={4} lg={4}>
                                        <div className="stake-card-tvl">
                                            <p className="stake-card-metrics-title">{t("tvl")}</p>
                                            <p className="stake-card-metrics-value">
                                                {stakingTVL
                                                    ? new Intl.NumberFormat("en-US", {
                                                          style: "currency",
                                                          currency: "USD",
                                                          maximumFractionDigits: 0,
                                                          minimumFractionDigits: 0,
                                                      }).format(stakingTVL)
                                                    : // <Skeleton width="150px" />
                                                      "$3219"}
                                            </p>
                                        </div>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={4} lg={4}>
                                        <div className="stake-card-index">
                                            <p className="stake-card-metrics-title">{t("currentIndex")}</p>
                                            <p className="stake-card-metrics-value">{currentIndex ? <>{trim(Number(currentIndex), 2)} SDD</> : "2.1SDD"}</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <div className="stake-card-area">
                            {!address && (
                                <div className="stake-card-wallet-notification">
                                    <div className="stake-card-wallet-connect-btn" onClick={connect}>
                                        <p>{t("connect")}</p>
                                    </div>
                                    <p className="stake-card-wallet-desc-text">{t("ConnectToStake")}</p>
                                </div>
                            )}
                            {address && (
                                <div>
                                    <div className="stake-card-action-area">
                                        <div className="stake-card-action-stage-btns-wrap">
                                            <div onClick={changeView(0)} className={classnames("stake-card-action-stage-btn", { active: !view })}>
                                                <p>{t("stake")}</p>
                                            </div>
                                            <div onClick={changeView(1)} className={classnames("stake-card-action-stage-btn", { active: view })}>
                                                <p>{t("unstake")}</p>
                                            </div>
                                        </div>

                                        <div className="stake-card-action-row">
                                            <OutlinedInput
                                                type="number"
                                                placeholder={t("amount")}
                                                className="stake-card-action-input"
                                                value={quantity}
                                                onChange={e => setQuantity(e.target.value)}
                                                labelWidth={0}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <div onClick={setMax} className="stake-card-action-input-btn">
                                                            <p>{t("max")}</p>
                                                        </div>
                                                    </InputAdornment>
                                                }
                                            />

                                            {view === 0 && (
                                                <div className="stake-card-tab-panel">
                                                    {address && hasAllowance("time") ? (
                                                        <div
                                                            className="stake-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "staking")) return;
                                                                onChangeStake("stake");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "staking", `${t("stake")} SDD`)}</p>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="stake-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "approve_staking")) return;
                                                                onSeekApproval("time");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "approve_staking", `${t("approval")} SDD`)}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {view === 1 && (
                                                <div className="stake-card-tab-panel">
                                                    {address && hasAllowance("memo") ? (
                                                        <div
                                                            className="stake-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "unstaking")) return;
                                                                onChangeStake("unstake");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "unstaking", `${t("unstake")} sSDD`)}</p>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="stake-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "approve_unstaking")) return;
                                                                onSeekApproval("memo");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "approve_unstaking", `${t("approval")} sSDD`)}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="stake-card-action-help-text">
                                            {address && ((!hasAllowance("time") && view === 0) || (!hasAllowance("memo") && view === 1)) && <p>{t("note")}</p>}
                                        </div>
                                    </div>

                                    <div className="stake-user-data">
                                        <div className="data-row">
                                            <p className="data-row-name">{t("yourbalance")}</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{trim(Number(timeBalance), 4)} SDD</>}</p>
                                        </div>

                                        <div className="data-row">
                                            <p className="data-row-name">{t("yourstakedbalance")}</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{trimmedMemoBalance} sSDD</>}</p>
                                        </div>

                                        <div className="data-row">
                                            <p className="data-row-name">{t("nextRewardAmount")}</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{nextRewardValue} sSDD</>}</p>
                                        </div>

                                        <div className="data-row">
                                            <p className="data-row-name">{t("nextRewardYeild")}</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{stakingRebasePercentage}%</>}</p>
                                        </div>

                                        <div className="data-row">
                                            <p className="data-row-name">{t("roi")}</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{trim(Number(fiveDayRate) * 100, 4)}%</>}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Grid>
                </div>
            </Zoom>
        </div>
    );
}

export default Stake;
