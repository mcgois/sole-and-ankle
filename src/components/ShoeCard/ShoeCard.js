import React from 'react';
import styled from 'styled-components/macro';
import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, isNewShoe, pluralize } from '../../utils';
import Spacer from '../Spacer';


const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={{ '--text-decoration': salePrice ? 'line-through' : 'none'}}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
        <Banner variant={variant}>{variant}</Banner>
      </Wrapper>
    </Link>
  );
};

const Banner = ({ variant} ) => {
  if (variant === 'on-sale') {
    return <SaleBanner>Sale</SaleBanner>
  }

  if (variant === 'new-release') {
    return <ReleaseBanner>Just Released!</ReleaseBanner>
  }

  return null;
}

const BannerBase = styled.div`
   position: absolute;
   top: 12px;
   right: -4px;
   border-radius: 2px;
   padding: 8px;
   font-weight: 700;
   color: white;
   font-size: ${14/16}rem;
`;

const SaleBanner = styled(BannerBase)`
  background-color: #C5295D;
`;

const ReleaseBanner = styled(BannerBase)`
  background-color: #6868D9;



// const Banner = styled.div`
//   position: absolute;
//   top: 12px;
//   right: -4px;
//   background-color: red;
//   padding: 8px;
// `;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
