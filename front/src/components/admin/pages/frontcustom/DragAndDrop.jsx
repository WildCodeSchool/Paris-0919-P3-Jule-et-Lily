import React, { Component } from 'react'

class DragAndDrop extends Component {
    state = {
        drag: false
    }
    dropRef = React.createRef()
    handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }
    handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter++
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({ drag: true })
        }
    }
    handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter--
        if (this.dragCounter === 0) {
            this.setState({ drag: false })
        }
    }
    handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ drag: false })
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.props.handleDrop(e.dataTransfer.files)
            e.dataTransfer.clearData()
            this.dragCounter = 0
        }
    }
    componentDidMount() {
        let div = this.dropRef.current
        div.addEventListener('dragenter', this.handleDragIn)
        div.addEventListener('dragleave', this.handleDragOut)
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
    }
    componentWillUnmount() {
        let div = this.dropRef.current
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragleave', this.handleDragOut)
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
    }
    render() {
        return (
            <div className="drag-drop-container" ref={this.dropRef}>
                <div className="drag-drop-input">
                    <div className="drag-drop-input py-5">
                        <div className="text-center my-3">Drop your bullshits here...</div>
                        <div className="text-center">
                            <i className="fas fa-fish fa-3x mx-3"></i>
                            <i className="fas fa-frog fa-3x mx-3"></i>
                            <i className="fas fa-user-ninja fa-3x vanished mx-3"></i>
                        </div>
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}
export default DragAndDrop