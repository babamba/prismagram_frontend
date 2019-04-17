import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard"
import SquarePost from "../../Components/SquarePost"

const Wrapper = styled.div`
     height:50vh;
     text-align:center;
`;

const Section = styled.div`
     margin-bottom: 20px;
     display:grid;
     grid-template-columns:repeat(4, 160px);
     grid-template-rows:160px;
     grid-auto-rows: 160px;
     grid-gap:25px;
`;

const PostSection = styled(Section)`
     grid-template-columns:repeat(4, 200px);
     grid-template-rows:200px;
     grid-auto-rows: 200px;
`

const SearchPresenter = ({ searchTerm, loading , data }) => {
     if(searchTerm === undefined){
          return (
               <Wrapper>
                    <FatText text={"Search for something"}/>
               </Wrapper>
          );
     }else if(loading === true){
          return (
               <Wrapper>
                    <Loader/>
               </Wrapper>
          );
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
                                   id={user.id}
                              />
                         ))
                    )}
                    </Section>

                    <PostSection>
                    { data.searchPost.length === 0 ? (
                         <FatText text={"No Photos Found"}/> 
                    ) : ( 
                         data.searchPost.map(post => (
                              <SquarePost 
                                   likeCount={post.likeCount}
                                   commentCount={post.commentCount}
                                   file={post.files[0]}
                              />
                         ))
                    )}
                    </PostSection>
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