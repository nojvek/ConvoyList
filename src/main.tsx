import {h, render, Component} from 'preact'
import {AppViewModel, JobItem} from './appViewModel'
import {AppView} from './appView'
import * as api from './api'

function onReady () {
    const viewModel = new AppViewModel()

    // Load initial list of jobs
    viewModel.jobs = api.getJobs()

    // Bind viewModel changes to storage
    viewModel.subscribe(() => {
        api.setJobs(viewModel.jobs)
    })

    // Bind viewModel changes to view
    const onViewRef = (view: AppView) => {
        if (view)
            viewModel.subscribe(view.enqueueRender)
    }

    render(<AppView ref={onViewRef} viewModel={viewModel}/>, document.body)
}

// render an instance of Clock into <body>:
window.addEventListener("DOMContentLoaded", onReady)
