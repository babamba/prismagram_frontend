import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/SearchCard"

const Wrapper = styled.div`
     height:50vh;
     text-align:center;
`;

const Section = styled.div``;

const SearchPresenter = ({ searchTerm, loading , data }) => {
     if(searchTerm === undefined){
          return <Wrapper><FatText text={"Search for something"}/></Wrapper>
     }else if(loading === true){
          return <Wrapper><Loader/></Wrapper>
     }else if(data && data.searchPost && data.searchUser){
          return (
               <Wrapper>
                    <Section>
                    { data.searchUser.length === 0 ? (
                         <FatText text={"No User Found"}/> 
                    ) : ( 
                    data.searchUser.map(user => (
                         <UserCard 
                              key={user.id}
                              username={user.username} 
                              isFollowing={user.isFollowing} 
                              url={user.avatar} 
                              isSelf={user.isSelf} 
                         />
                         ))
                    )}
                    </Section>

                    <Section>
                    { data.searchPost.length === 0 ? (
                         <FatText text={"No Photos Found"}/> 
                    ) : ( 
                         data.searchPost.map(post => null )
                    )}
                    </Section>
               </Wrapper>
          );
     }
}

// (
//      <Wrapper>
//           { searchTerm === undefined && <FatText text={"Search for something"}/> }
//           { loading && <Loader/> }
//           { !loading && data && data.searchUser && data.searchUser.length === 0 && (
//                <FatText text={"No User Found"}/>
//           )}
//           { !loading && data && data.searchPost && data.searchPost.length === 0 && (
//                <FatText text={"No Photo Found"}/>
//           )}

//      </Wrapper>
// );

SearchPresenter.propTypes = {
     searchTerm : PropTypes.string,
     loading : PropTypes.bool.isRequired
}

export default SearchPresenter;