import {
	IonCard,
	IonCol,
	IonContent,
	IonGrid,
	IonPage,
	IonRow,
	IonSegment,
} from "@ionic/react";
import React from "react";
import { LoginMetadata } from "../../models/LoginMetadata";
import { HelpdeskDashboard } from "../../models/HelpdeskDashboard/HelpdeskDashboard";
import { HelpdeskDashboardService } from "../../services/HelpdeskDashboardService";
import HeaderToolbar from "../../components/HeaderToolbar";
import bullet from "../../images/bullet.svg";
import "../../styles/HelpdeskDashboard.css";
import Loading from "../../components/Loading";

interface DashboardStates {
	dashboardObject: HelpdeskDashboard;
	showLoading: boolean;
}
interface DashboardProps {
	loginMetadata: LoginMetadata;
}

class HelpDeskDashBoard extends React.Component<DashboardProps, DashboardStates> {
	constructor(props: DashboardProps) {
		super(props);
		this.state = {
			dashboardObject: new HelpdeskDashboard(),
			showLoading: true
		};
	}

	componentDidMount() {
		this.getdata(false);
	}
	getdata(refresh:boolean) {
		HelpdeskDashboardService.GetMemberDashboard(this.props.loginMetadata, refresh)
			.then((response: HelpdeskDashboard) => {
				this.setState({ showLoading: false, dashboardObject: response });
			})
			.catch(() => {
				this.setState({ showLoading: false });
			});
			this.setState({ showLoading: true });
	}
	render() {
		return (
			<IonPage>
				<HeaderToolbar
					refreshPage={() => {this.getdata(true)}}
					previousPage={() => { }}
					showBackButton={false}
					showRefreshButton={true}
				/>
				{this.state.showLoading ? (
					<IonContent>
						<Loading />
					</IonContent>

				) : (
					<IonContent>
						<IonGrid className="limitContent">
						<IonSegment mode ="md" className="Helptext2">
							{this.props.loginMetadata.chapterName}
            	</IonSegment>
						<IonCard className="HelpCard">
							<IonGrid>
								<IonRow>
									<IonCol size="10" className="ion-text-start helpContent">
										<img className="bullet" src={bullet} alt="" />
                      					Pending on IIA
                        		</IonCol>
									<IonCol size="2" className="ion-text-center membervalue">
										{this.state.dashboardObject.PendingOnIIAChapterLevel}
									</IonCol>
								</IonRow>
								<IonRow>
									<IonCol size="10" className="ion-text-start helpContent">
										<img className="bullet" src={bullet} alt="" />
                      				Pending on Users
                      			</IonCol>
									<IonCol size="2" className="ion-text-center membervalue">
										{this.state.dashboardObject.PendinOnUsersChapterLevel}
									</IonCol>
								</IonRow>
							</IonGrid>
						</IonCard>
						<IonCard className="HelpCard">
							<IonGrid>
								<IonRow>
									<IonCol size="10" className="ion-text-start helpContent">
										<img className="bullet" src={bullet} alt="" />
                      					Open for {'<'} 15 days
                        		</IonCol>
									<IonCol size="2" className="ion-text-center membervalue">
										{this.state.dashboardObject.OpenFor15ChapterLevel}
									</IonCol>
								</IonRow>

								<IonRow>
									<IonCol size="10" className="ion-text-start helpContent">
										<img className="bullet" src={bullet} alt="" />
                      				Open for 15-30 days
                      			</IonCol>
									<IonCol size="2" className="ion-text-center membervalue">
										{this.state.dashboardObject.OpenFor30ChapterLevel}
									</IonCol>
								</IonRow>
								<IonRow>
									<IonCol size="10" className="ion-text-start helpContent">
										<img className="bullet" src={bullet} alt="" />
                      				Open for {'>'} 30 days
                      			</IonCol>
									<IonCol size="2" className="ion-text-center membervalue">
										{this.state.dashboardObject.OpenFor30MoreChapterLevel}
									</IonCol>
								</IonRow>
							</IonGrid>
						</IonCard>
						<IonRow>
							<IonSegment mode ="md" className="Helptext">
								Number of Open tickets: : &nbsp;
                    <span className="chapterLevel">
									{this.state.dashboardObject.OpenTicketChapterLevel}
								</span>

							</IonSegment>
						</IonRow>
						<IonRow>
							<IonSegment mode ="md" className="Helptext">
								Tickets Closed: : &nbsp;
                    <span className="chapterLevel">
									{this.state.dashboardObject.ClosedTicketChapterLevel}
								</span>

							</IonSegment>
						</IonRow>
						{this.props.loginMetadata.chapterId==82?(
						<IonGrid>
						<IonSegment mode ="md" className="Helptext2">
							All Chapter level
            		</IonSegment>
						<IonCard className="HelpCard">
							<IonGrid>
								<IonRow>
									<IonCol size="10" className="ion-text-start helpContent">
										<img className="bullet" src={bullet} alt="" />
                      				Pending on IIA
                        		</IonCol>
									<IonCol size="2" className="ion-text-center membervalue">
										{this.state.dashboardObject.PendingOnIIACenterLevel}
									</IonCol>
								</IonRow>
								<IonRow>
									<IonCol size="10" className="ion-text-start helpContent">
										<img className="bullet" src={bullet} alt="" />
                      					Pending on Users
                      			</IonCol>
									<IonCol size="2" className="ion-text-center membervalue">
										{this.state.dashboardObject.PendingOnUsersCenterLevel}
									</IonCol>
								</IonRow>
							</IonGrid>
						</IonCard>
						<IonCard className="HelpCard">
							<IonGrid>
								<IonRow>
									<IonCol size="10" className="ion-text-start helpContent">
										<img className="bullet" src={bullet} alt="" />
                      				Open for {'<'} 15 days
                       		</IonCol>
									<IonCol size="2" className="ion-text-center membervalue">
										{this.state.dashboardObject.OpenFor15CenterLevel}
									</IonCol>
								</IonRow>

								<IonRow>
									<IonCol size="10" className="ion-text-start helpContent">
										<img className="bullet" src={bullet} alt="" />
                      				Open for 15-30 days
                      			</IonCol>
									<IonCol size="2" className="ion-text-center membervalue">
										{this.state.dashboardObject.OpenFor30CenterLevel}
									</IonCol>
								</IonRow>
								<IonRow>
									<IonCol size="10" className="ion-text-start helpContent">
										<img className="bullet" src={bullet} alt="" />
                      				Open for {'>'} 30 days
                      			</IonCol>
									<IonCol size="2" className="ion-text-center membervalue">
										{this.state.dashboardObject.OpenFor30MoreCenterLevel}
									</IonCol>
								</IonRow>
							</IonGrid>
						</IonCard>
						<IonRow>
							<IonSegment mode ="md" className="Helptext">
								Number of Open tickets: : &nbsp;
                    <span className="chapterLevel">
									{this.state.dashboardObject.OpenTicketCenterLevel}
								</span>

							</IonSegment>
						</IonRow>
						<IonRow>
							<IonSegment mode ="md" className="Helptext">
								Tickets Closed: : &nbsp;
                    <span className="chapterLevel">
									{this.state.dashboardObject.ClosedTicketCenterLevel}
								</span>

							</IonSegment>
						</IonRow>
						</IonGrid>):null}
						
						</IonGrid>
					</IonContent>
				)}

			</IonPage>
		)
	}
}

export default HelpDeskDashBoard;
