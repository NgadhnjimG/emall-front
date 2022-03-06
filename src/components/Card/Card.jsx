/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {Component} from "react";

export class Card extends Component {
    render() {
        return (
            <div className={"card" + (this.props.plain ? " card-plain" : "")}>
                <div className={"header" + (this.props.hCenter ? " text-center" : "")}>
                    <h2 className="title card-post-title post-details-title">{this.props.title}</h2>
                    {this.props.Price == null ? "" :
                        <h2 className="title product-price-details">{this.props.Price} &euro;</h2>}
                    {this.props.category == null ? "" : <p className="category">{this.props.category}</p>}
                </div>
                <div
                    className={
                        "content" +
                        (this.props.ctAllIcons ? " all-icons" : "") +
                        (this.props.ctTableFullWidth ? " table-full-width" : "") +
                        (this.props.ctTableResponsive ? " table-responsive" : "") +
                        (this.props.ctTableUpgrade ? " table-upgrade" : "")
                    }
                >
                    {this.props.content}

                    <div className="footer">
                        {this.props.legend}
                        {this.props.stats != null ? <hr/> : ""}
                        <div className="stats">
                            <i className={this.props.statsIcon}/> {this.props.stats}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
