import React, { Component } from 'react';
import { Link } from '@reach/router';

class Home extends Component {
	render() {

const { user } = this.props;

		const biggerLead = {
			fontSize: 1.4 + 'em',
			fontWeight: 200
		}

		return (
			<div className="container text-center">
				<div className="row justify-content-center">
					
					<div className="col-10 col-md-10 col-lg-8 col-xl-7">
						<div className="display-4 text-primary mt-3 mb-3">
							Welcome mind home
						</div> 
						<p className="lead" style={biggerLead}>
							This is the gift for myselft, I lead my wave
							to the dream of a green field.
						</p>
					{/*<a href="/register" className="btn btn-outline-primary mr-2">
						Register
						</a>*/}
						{user == null && (
							<Link to="/login" className="btn btn-outline-primary mr-2">
								Login
							</Link>
						)}
						
					</div>
				</div>
			</div>
		);
	}

}

export default Home;