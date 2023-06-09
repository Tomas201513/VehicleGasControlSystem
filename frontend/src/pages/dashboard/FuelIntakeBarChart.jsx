import React from 'react';
import PropTypes from 'prop-types';
import SyncIcon from '@mui/icons-material/Sync';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    SvgIcon,
    Typography,
    Box,
} from '@mui/material';
import FuelContext from 'src/context/FuelContext';
import { alpha, useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { css } from '@emotion/react';
const Charts = ({ css: styles, ...rest }) => (
    <ReactApexChart css={css`${styles}`} {...rest} />
);
const useChartOptions = () => {
    const theme = useTheme();

    return {
        chart: {
            background: 'transparent',
            stacked: false,
            toolbar: {
                show: false
            }
        },
        colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1,
            type: 'solid'
        },
        grid: {
            borderColor: theme.palette.divider,
            strokeDashArray: 2,
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        legend: {
            show: false
        },
        plotOptions: {
            bar: {
                columnWidth: '40px'
            }
        },
        stroke: {
            colors: ['transparent'],
            show: true,
            width: 2
        },
        theme: {
            mode: theme.palette.mode
        },
        xaxis: {
            axisBorder: {
                color: theme.palette.divider,
                show: true
            },
            axisTicks: {
                color: theme.palette.divider,
                show: true
            },
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            labels: {
                offsetY: 5,
                style: {
                    colors: theme.palette.text.secondary
                }
            }
        },
        yaxis: {
            labels: {
                formatter: (value) => (value > 0 ? `${value}L` : `${value}`),
                offsetX: -10,
                style: {
                    colors: theme.palette.text.secondary
                }
            }
        }
    };
};

export const FuelIntakeBarChart = (props) => {
    const { chartSeries, sx } = props;
    const chartOptions = useChartOptions();
    const { refetch: refetchFuel, refetchByCar, refetchByMonth, } = React.useContext(FuelContext);
    return (
        <Card sx={sx}>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                <Typography sx={{
                    fontWeight: "bold",
                    color: "#000",
                }} variant="h6" >
                    Fuel Intakes
                </Typography>
                <Button
                    onClick={() => { refetchFuel(); refetchByCar(); refetchByMonth(); }}
                    color="inherit"
                    size="small"
                    startIcon={(
                        <SvgIcon fontSize="small">
                            <SyncIcon />
                        </SvgIcon>
                    )}
                >
                    Sync
                </Button>
            </Box>
            <CardContent>
                <Charts
                    height={350}
                    options={chartOptions}
                    series={chartSeries}
                    type="bar"
                    width="100%"
                />
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
            </CardActions>
        </Card>
    );
};

FuelIntakeBarChart.propTypes = {
    chartSeries: PropTypes.array.isRequired,
    sx: PropTypes.object,
    css: PropTypes.string,
};