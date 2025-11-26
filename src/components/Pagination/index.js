import React from 'react'
import './index.css'

class Pagination extends React.Component {
  state = {
    pageNo: 1,
  }

  componentDidUpdate(prevProps) {
    // If totalPages changed and current page is out of range, clamp it
    const {totalPages = 1} = this.props
    const {pageNo} = this.state
    if (totalPages && pageNo > totalPages) {
      this.setState({pageNo: totalPages})
    }
  }

  onPageChange = newPage => {
    const {apiCallback} = this.props
    this.setState({pageNo: newPage}, () => {
      const {pageNo} = this.state
      // call parent callback with the new page number
      if (typeof apiCallback === 'function') {
        apiCallback(pageNo)
      }
    })
  }

  onNextPage = () => {
    const {totalPages = 1} = this.props
    this.setState(
      prevState => {
        const next = Math.min(prevState.pageNo + 1, totalPages)
        return {pageNo: next}
      },
      () => {
        const {pageNo} = this.state
        const {apiCallback} = this.props
        if (typeof apiCallback === 'function') apiCallback(pageNo)
      },
    )
  }

  onPrevPage = () => {
    this.setState(
      prevState => {
        const prev = Math.max(prevState.pageNo - 1, 1)
        return {pageNo: prev}
      },
      () => {
        const {pageNo} = this.state
        const {apiCallback} = this.props
        if (typeof apiCallback === 'function') apiCallback(pageNo)
      },
    )
  }

  render() {
    const {pageNo} = this.state
    const {totalPages = 1} = this.props

    return (
      <div className="mb-3 d-flex justify-content-center align-items-center pagination-container">
        <button
          type="button"
          className="control-btn"
          onClick={this.onPrevPage}
          disabled={pageNo <= 1}
          aria-label="previous-page"
        >
          Prev
        </button>

        <div className="page-info mx-3" aria-live="polite">
          <span className="page-no">{pageNo}</span>
          <span className="total-pages"> / {totalPages}</span>
        </div>

        <button
          type="button"
          className="control-btn"
          onClick={this.onNextPage}
          disabled={pageNo >= totalPages}
          aria-label="next-page"
        >
          Next
        </button>
      </div>
    )
  }
}

export default Pagination
