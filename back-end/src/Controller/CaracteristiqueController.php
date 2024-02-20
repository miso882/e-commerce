<?php

namespace App\Controller;

use App\Entity\Caracteristique;
use App\Repository\CaracteristiqueRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Items;
use App\Repository\CategoriesRepository;
use App\Repository\ItemsRepository;
use App\Repository\SubcategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

class CaracteristiqueController extends AbstractController
{
    #[Route('/api/caracteristique', name: 'caracteristique', methods: ['GET'])]
    // #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants pour supprimer un utilisateur')]
    public function getCaracteristiqueList(SerializerInterface $serializer, CaracteristiqueRepository $caracteristiqueRepository): JsonResponse
    {
        $caracteristiqueList = $caracteristiqueRepository->findAll();
        $jsonCaracteristiqueList = $serializer->serialize($caracteristiqueList, 'json', ['groups' => 'getCaracteristique']);
        return new JsonResponse($jsonCaracteristiqueList, Response::HTTP_OK, [], true);
    }

    #[Route('/api/caracteristique/{id}', name: 'detailCaracteristique', methods: ['GET'])]
    public function getDetailCaracteristique(SerializerInterface $serializer, Caracteristique $caracteristique): JsonResponse
    {
        // $user = $userRepository->find($id);
        // if($user){
        $jsonCaracteristique = $serializer->serialize($caracteristique, 'json', ['groups' => 'getItems']);
        return new JsonResponse($jsonCaracteristique, Response::HTTP_OK, ['accept' => 'json'], true);
        // return new JsonResponse($jsonUser, Response::HTTP_OK, [], true);
        // }
        // return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }

    #[Route('/api/caracteristique', name: "createCaracteristique", methods: ['POST'])]
    public function createCaracteristique(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $em,
        UrlGeneratorInterface $urlGenerator,
        ItemsRepository $itemRepository
    ): JsonResponse {
        $caracteristique = $serializer->deserialize($request->getContent(), Caracteristique::class, 'json');
        $content = $request->toArray();
        $item = $content['item'] ?? -1;
        $caracteristique->setItem($itemRepository->find($item));
        $em->persist($caracteristique);
        $em->flush();
        $jsonUser = $serializer->serialize(
            $caracteristique,
            'json',
            ['groups' => 'getCaracteristique']
        );
        $location = $urlGenerator->generate(
            'detailCaracteristique',
            ['id' => $caracteristique->getId()],
            UrlGeneratorInterface::ABSOLUTE_URL
        );
        return new JsonResponse($jsonUser, Response::HTTP_CREATED, ["Location" => $location], true);
    }

    //update
    #[Route('/api/caracteristique/{id}', name: "updateCaracteristique", methods: ['PUT'])]
    public function updateitem(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, Caracteristique $currentcaracteristique, ItemsRepository $itemRepository): JsonResponse
    {
        $updatecaracteristique =  $serializer->deserialize(
            $request->getContent(),
            Caracteristique::class,
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $currentcaracteristique]
        );
        // $content = $request->toArray();
        // $idItem = $content['idItem'] ?? $updatecaracteristique->getCategory();
        // $updatecaracteristique->setCategory($itemRepository->find($idItem));
        $em->persist($updatecaracteristique);
        $em->flush();
        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }
    //delete
    #[Route('/api/caracteristique/{id}', name: 'deleteCaracteristique', methods: ['DELETE'])]
    public function deleteitem(Caracteristique $caracteristique, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($caracteristique);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
