import { useSelector } from "react-redux";
import { Paper, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Zoom } from "@material-ui/core";
import { BondTableData, BondDataCard } from "./BondRow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { trim } from "../../helpers";
import useBonds from "../../hooks/bonds";
import "./choosebond.scss";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { useTranslation } from "react-i18next";

function ChooseBond() {
    const { bonds } = useBonds();
    const isSmallScreen = useMediaQuery("(max-width: 733px)"); // change to breakpoint query
    const { t, i18n } = useTranslation();

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const marketPrice = useSelector<IReduxState, number>(state => {
        return state.app.marketPrice;
    });

    const treasuryBalance = useSelector<IReduxState, number>(state => {
        return state.app.treasuryBalance;
    });

    return (
        <div className="choose-bond-view">
            <Zoom in={true}>
                <div className="choose-bond-view-card">
                    <div className="choose-bond-view-card-header">
                        <p className="choose-bond-view-card-title"> {t("bond")} (🫖, 🫖)</p>
                    </div>

                    <Grid container item xs={12} spacing={2} className="choose-bond-view-card-metrics">
                        <Grid item xs={12} sm={6}>
                            <Box textAlign="center">
                                <p className="choose-bond-view-card-metrics-title">{t("treasuryBalance")}</p>
                                {/* <p className="choose-bond-view-card-metrics-value">
                                    {isAppLoading ? (
                                        <Skeleton width="180px" />
                                    ) : (
                                        new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        }).format(treasuryBalance)
                                    )}
                                </p> */}
                                <p className="choose-bond-view-card-metrics-value">
                                    {isAppLoading ? (
                                        <Skeleton width="180px" />
                                    ) : (
                                        new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        }).format(2100)
                                    )}
                                </p>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Box textAlign="center">
                                <p className="choose-bond-view-card-metrics-title">SDD {t("price")}</p>
                                {/* <p className="choose-bond-view-card-metrics-value">{isAppLoading ? <Skeleton width="100px" /> : `$${trim(marketPrice, 2)}`}</p>
                                 */}
                                <p className="choose-bond-view-card-metrics-value">{isAppLoading ? <Skeleton width="100px" /> : `$${trim(12.9, 2)}`}</p>
                            </Box>
                        </Grid>
                    </Grid>

                    {!isSmallScreen && (
                        <Grid container item>
                            <TableContainer className="choose-bond-view-card-table">
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">
                                                <p className="choose-bond-view-card-table-title">{t("bond")}</p>
                                            </TableCell>
                                            <TableCell align="center">
                                                <p className="choose-bond-view-card-table-title">{t("price")}</p>
                                            </TableCell>
                                            <TableCell align="center">
                                                <p className="choose-bond-view-card-table-title">{t("roi")}</p>
                                            </TableCell>
                                            <TableCell align="right">
                                                <p className="choose-bond-view-card-table-title">{t("Purchased")}</p>
                                            </TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bonds.map(bond => (
                                            <BondTableData key={bond.name} bond={bond} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    )}
                </div>
            </Zoom>

            {isSmallScreen && (
                <div className="choose-bond-view-card-container">
                    <Grid container item spacing={2}>
                        {bonds.map(bond => (
                            <Grid item xs={12} key={bond.name}>
                                <BondDataCard key={bond.name} bond={bond} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </div>
    );
}

export default ChooseBond;
