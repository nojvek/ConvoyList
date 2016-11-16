import {h, render, Component} from 'preact'
import {CSSProperties} from 'typestyle'
import {AppViewModel, JobItem} from './appViewModel'
import {theme} from './theme'

interface AppViewProps {
    ref: ($:AppView) => void
    viewModel: AppViewModel
}

const JobItemView = ({job}: {job: JobItem})  => {
    const jobStyle: CSSProperties = {
        borderTop: `1px solid ${theme.borderColor}`,
        padding: 20,
    }

    const stopStyle: CSSProperties = {
        borderTop: `1px solid ${theme.borderColor}`,
        marginLeft: 50,
        marginTop: 20,
        padding: 10,
        paddingBottom:0
    }

    const itemStyle: CSSProperties = {
        paddingBottom: 5
    }

    return (
        <div style={jobStyle}>
            <div>{job.referenceId} - <span>{job.title}</span></div>
            {job.stops.map(stop =>
                <div style={stopStyle}>
                    <div style={itemStyle}>{stop.type}: {stop.cargoDescription}</div>
                    <div style={itemStyle}>Address: {stop.address}</div>
                    <div style={itemStyle}>Arrival Time: {new Date(stop.arrivalTime).toString()}</div>
                    {stop.type == 'PICKUP' ?
                        <div>
                            <input type='checkbox' /> Photograph of Inventory <br/>
                            <input type='checkbox' /> Bill of Ladig <br/>
                        </div>
                    :
                        <div>
                            <input type='checkbox' /> Photograph of Inventory <br/>
                            <input type='checkbox' /> Bill of Ladig Signed <br/>
                        </div>
                    }
                </div>
            )}
        </div>
    )
}

export class AppView extends Component<AppViewProps, never> {
    render({viewModel}: AppViewProps) {
        const appStyle: CSSProperties = {
            fontFamily: theme.fontFamily,
            marginLeft: 'auto',
            marginRight: 'auto',
            width: 540,
            border: `1px solid ${theme.borderColor}`,
            color: theme.textColor
        }

        const titleStyle: CSSProperties = {
            textAlign: 'center',
            fontSize: 20,
            marginTop: 20,
            marginBottom: 20,
            fontWeight: 'bold'
        }

        return (
            <div style={appStyle}>
                <div style={titleStyle}>CONVOY JOB LIST</div>
                <div>
                {viewModel.jobs.map(job =>
                    <JobItemView job={job}/>
                )}
                </div>
            </div>
        )
    }
}